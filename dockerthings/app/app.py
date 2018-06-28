from flask import Flask, jsonify, request, send_from_directory
from algush import articles, query
app = Flask(__name__, static_url_path='', static_folder='dist',)

@app.route('/api/articles')
def get_atricles():
    return jsonify(articles())

@app.route('/api/query')
def query_article():
	article_idx = request.args.get('article')
	return jsonify(query(article_idx))

@app.route('/<path:path>')
def static_file(path):
    print(path)
    return app.send_static_file(path)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
