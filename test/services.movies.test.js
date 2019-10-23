const assert = require('assert');
const proxyquire = require('proxyquire'); //Replace Mongo Lib to our mock

const { getAllStub, MongoLibMock } = require('../utils/mocks/mongoLib')
const { moviesMock } = require('../utils/mocks/movies')

describe('services - movies', function() {
  //Call to original movies service and is replace to MongoLibMock
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  })
  //Service instance is created
  const moviesService = new MoviesServices()
  describe('When getMovies method is call', async function() {
    it('should call the getAll MongoLib method', async function() {
      await moviesService.getMovies({})
      assert.strictEqual(getAllStub.called, true)
    })

    it('should return an array of movies', async function() {
      const result = await moviesService.getMovies({})
      const expected = moviesMock
      assert.deepEqual(result, expected)
    })
  })
})