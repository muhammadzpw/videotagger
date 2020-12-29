import glob

from flask import Flask

app = Flask(__name__, static_url_path="static")


@app.route("/api")
def hello():
    print(glob.glob("*.mp4"))
    return {"data": "cool"}


if __name__ == "__main__":
    app.run(host="0.0.0.0")
