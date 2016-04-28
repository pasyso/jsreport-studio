import api from '../helpers/api.js'
import Promise from 'bluebird'

export let engines = []
export let recipes = []

export const load = () => Promise.all([
  api.get('/api/engine').then((engs) => (engines = engs)),
  api.get('/api/recipe').then((recs) => (recipes = recs))])
