from flask import Flask, jsonify, request
from algush import articles, query
app = Flask(__name__)

@app.route('/api/articles')
def get_atricles():
    return jsonify(articles())

@app.route('/api/query')
def query_article():
	article_idx = request.args.get('article')
	return jsonify(query(article_idx))
	
	
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')