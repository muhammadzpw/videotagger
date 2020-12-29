import json
import os
from datetime import datetime
from os.path import dirname, join, realpath

from flask import Flask, flash, redirect, request, send_from_directory, url_for
from markupsafe import escape
from werkzeug.utils import secure_filename

from utils import ALLOWED_EXTENSIONS, absolute_path, allowed_file, make_message

UPLOAD_FOLDER = "static/data"


app = Flask(__name__, static_url_path="")
app.config["UPLOAD_FOLDER"] = absolute_path(UPLOAD_FOLDER)


@app.route("/data/<path:path>", methods=["GET"])
def upload_data(path):
    return send_from_directory(UPLOAD_FOLDER, path)


@app.route("/api/data", methods=["GET"])
def list_data():
    data = os.listdir(UPLOAD_FOLDER)
    return data


def get_state_file(filename):
    return join(app.config["UPLOAD_FOLDER"], "{}.json".format(escape(filename)))


@app.route("/api/states", methods=["POST"])
def save_state():
    req_body = request.get_json()
    filename = get_state_file(req_body["filename"])
    with open(filename, "w+") as json_file:
        json_text = json.dumps(req_body)
        json_file.write(json_text)
    return req_body


@app.route("/api/states/<filename>", methods=["GET"])
def get_state(filename):
    with open(get_state_file(filename), "r+") as json_file:
        json_obj = json_file.read()
        return json.loads(json_obj)


@app.route("/api/upload", methods=["POST"])
def upload_file():
    files = request.files.getlist("file")
    print(files)
    if files == None or len(files) == 0:
        return make_message("No file part")

    file_responses = []
    for f in files:
        if f and allowed_file(f.filename):
            filename = secure_filename(f.filename)
            f.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            file_responses.append(
                {
                    "filename": filename,
                    "length": f.content_length,
                    "type": f.content_type,
                }
            )

    return make_message(
        "Successfully upload {} data".format(len(file_responses)), file_responses
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0")
