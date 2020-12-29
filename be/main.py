import os

from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path="")


@app.route("/data/<path:path>")
def send_js(path):
    return send_from_directory("static/data", path)


@app.route("/api")
def hello():
    data = os.listdir("static/data")
    return {"data": "cool", "files": data}


if __name__ == "__main__":
    app.run(host="0.0.0.0")
