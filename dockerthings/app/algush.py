import faiss
import pickle
import numpy as np
import random
from functools import reduce
ARTICLES_PER_PAGE = 102

f = open('db.pickle', 'rb')
raw_data = pickle.load(f)
data = {}
keyz = ['abstract', 'title', 'title vector', 'abstract vector']
keyss = {x: idx for idx, x in enumerate(set(reduce(lambda x,y: x+y, [list(raw_data[x].keys()) for x in keyz])))}
for k in raw_data:
  data[k] = [0]*len(keyss)
  unspecified_list = [x if x not in raw_data[k] else None for x in keyss.keys()]
  for kk in raw_data[k]:
    idx = keyss[kk]
    data[k][idx] = raw_data[k][kk]
  for kk in unspecified_list:
    if kk is None:
      continue
    idx = keyss[kk]
    if k.endswith('vector'):
      data[k][idx] = np.zeros(300)
    else:
      data[k][idx] = 'Empty'

m = min(len(data['abstract vector']), len(data['title vector']))
abstract_vectors = np.asarray(data['abstract vector'], dtype=np.float32)
title_vectors = np.asarray(data['title vector'], dtype=np.float32)


nb, d = abstract_vectors.shape
nq = 10000
index_abstract = faiss.IndexFlatL2(d)
index_abstract.add(abstract_vectors)
nb, d = title_vectors.shape
index_titles = faiss.IndexFlatL2(d)
index_titles.add(title_vectors)


def articles():
  samp = random.sample(range(0,len(data['abstract'])),ARTICLES_PER_PAGE)
  return list(map(lambda x: {"title": data['title'][x], "abstract": data['abstract'][x], "index":x}, samp))



def query(idx, by='abstract'):
  idx = int(idx)
  to_query = index_titles if by == 'title' else index_abstract
  vectors = title_vectors if by == 'title' else abstract_vectors
  dist, scores = to_query.search(np.asarray([vectors[idx]]), ARTICLES_PER_PAGE)
  articles = []
  scores = scores[0]
  dist = dist[0]
  for d,s in zip(dist, scores):
    title = data['title'][s]
    abstract = data['abstract'][s]
    idx = int(s)
    articles.append({"title": data['title'][s], "abstract": data['abstract'][s], "index":int(s), "distance": int(d)})
  return articles
