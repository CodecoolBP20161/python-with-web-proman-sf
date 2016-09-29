from flask import Flask, render_template


app = Flask('ProMan')


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()