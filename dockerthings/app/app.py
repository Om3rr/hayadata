from flask import Flask, jsonify, request, send_from_directory
from algush import articles, query, get_idx_by_key, whos_primary, query_by, dont_sort, idxs_to_articles, multiply_vectors, sort_by_distances
import json
import pdb
app = Flask(__name__, static_url_path='', static_folder='dist', )


@app.route('/api/articles')
def get_atricles():
  return jsonify(articles())


@app.route('/api/query')
def query_article():
  article_idx = request.args.get('article')
  state = request.args.get('state') or "title"
  print("state is %s" % state)
  return jsonify(query(article_idx, state))

@app.route('/api/multiple')
def query_multi():
  key = request.args.get('idx')
  mechanism = json.loads(request.args.get('mechanism'))
  purpose = json.loads(request.args.get('purpose'))
  idx = get_idx_by_key(key)
  l, o = whos_primary(purpose, mechanism)
  primary, secondary = l
  prim_o, sec_o = o
  if primary is None:
    return jsonify([])
  N = int(prim_o['slider'])
  distances, idxs = query_by(idx, primary, N)

  #query one vector at a time
  distances = distances[0]
  idxs = idxs[0]
  if(dont_sort(mechanism, purpose)):
    return jsonify(idxs_to_articles(idxs, distances))
  distances_two = multiply_vectors(idxs, idx, secondary)
  final_idxs, final_distances = sort_by_distances(idxs, [distances, distances_two], [prim_o['state'], sec_o['state']])
  return jsonify(idxs_to_articles(final_idxs, final_distances))


@app.route('/<path:path>')
def static_file(path):
  return app.send_static_file(path)


@app.route('/')
def root():
  return app.send_static_file('index.html')


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
