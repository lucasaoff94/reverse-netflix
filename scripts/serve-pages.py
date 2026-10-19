"""Local static-only Pages simulator: no Next server, rewrites or application API."""
import argparse
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=4173)
parser.add_argument('--base-path', default='/reverse-netflix')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent / 'out'
prefix = args.base_path.rstrip('/')

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(root), **kw)

    def translate_path(self, path):
        if path == prefix or path.startswith(prefix + '/') or path.startswith(prefix + '?'):
            path = path[len(prefix):] or '/'
        else:
            return str(root / '__outside_pages_mount__')
        return super().translate_path(path)

    def send_head(self):
        self.range_remaining = None
        path = Path(self.translate_path(self.path))
        requested = self.headers.get('Range')
        if not requested or not path.is_file():
            return super().send_head()
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', requested)
        size = path.stat().st_size
        if match and (match[1] or match[2]):
            start = int(match[1]) if match[1] else max(0, size - int(match[2]))
            end = min(int(match[2]), size - 1) if match[1] and match[2] else size - 1
            if 0 <= start <= end < size:
                stream = path.open('rb')
                stream.seek(start)
                self.range_remaining = end - start + 1
                self.send_response(206)
                self.send_header('Content-Type', self.guess_type(str(path)))
                self.send_header('Accept-Ranges', 'bytes')
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
                self.send_header('Content-Length', str(self.range_remaining))
                self.end_headers()
                return stream
        self.send_response(416)
        self.send_header('Content-Range', f'bytes */{size}')
        self.send_header('Content-Length', '0')
        self.end_headers()
        return None

    def copyfile(self, source, outputfile):
        if self.range_remaining is None:
            return super().copyfile(source, outputfile)
        remaining = self.range_remaining
        while remaining > 0:
            data = source.read(min(65536, remaining))
            if not data:
                break
            outputfile.write(data)
            remaining -= len(data)

    def list_directory(self, path):
        self.send_error(404)
        return None

    def send_error(self, code, message=None, explain=None):
        page = root / '404.html'
        if code == 404 and page.exists():
            body = page.read_bytes()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
        else:
            super().send_error(code, message, explain)

print(f'Serving exported files from {root} under {prefix}/ on loopback port {args.port}', flush=True)
ThreadingHTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
