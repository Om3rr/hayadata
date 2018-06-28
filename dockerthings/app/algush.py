import pickle
import numpy as np
import faiss
import random
f = open('db.pickle', 'rb')
raw_data = pickle.load(f)
data = {}
for k in raw_data:
  data[k] = [None]*len(raw_data[k])
  for idx,kk in enumerate(raw_data[k]):
    data[k][idx] = raw_data[k][kk]

abstract_vectors = np.asarray(data['abstract vector'])
title_vectors = np.asarray(data['title vector'])


nb, d = abstract_vectors.shape
nq = 10000
index_abstract = faiss.IndexFlatL2(d)
index_abstract.add(abstract_vectors)
nb, d = title_vectors.shape
index_titles = faiss.IndexFlatL2(d)
index_titles.add(title_vectors)


def articles():
  samp = random.sample(range(0,len(data['abstract'])),30)
  return list(map(lambda x: {"title": data['title'][x], "abstract": data['abstract'][x], "index":x}, samp))



def query(idx, by='abstract'):
	idx = int(idx)
	to_query = index_titles if by == 'title' else index_abstract
	dist, scores = index_abstract.search(np.asarray([abstract_vectors[idx]]), 30)
	articles = []
	scores = scores[0]
	dist = dist[0]
	for d,s in zip(dist, scores):
		title = data['title'][s]
		abstract = data['abstract'][s]
		idx = int(s)
		articles.append({"title": data['title'][s], "abstract": data['abstract'][s], "index":int(s)})
	return articles
