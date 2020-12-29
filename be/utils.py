from datetime import datetime
from os.path import dirname, join, realpath

ALLOWED_EXTENSIONS = {"mp4"}


def absolute_path(path):
    return join(dirname(realpath(__file__)), path)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def make_message(msg, data=None):
    return {"message": msg, "data": data, "timestamp": datetime.now().isoformat()}
