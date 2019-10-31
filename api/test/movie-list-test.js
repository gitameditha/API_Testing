const assert = require('chai').expect;

const page = require('../page/movie-list-page.js');

const testCase = {
 "positive" : {
    "getList" : "As a User, I want to be able to get OMDB Movie list",
 },
 "negative" : {
    "noSearch" : "As a User, I should got error message when I send request without key of search",
    "invalidApiKey" : "As a User, I should got error 401 when I send request with invalid API Key",
    "searchSpecialcharacter" : "As a User,search use all special character",
    "apiKeyNull" : "As a User,search using null api key",
    "longString" : "As a User,search using long string",
    "searchParameter" : "search using parameter and parameter value"
   
 }
}

describe(`OMDB Movie List`, () => {
 const apiKey = '20c41ddb';
 const invalidApiKey = 'sdfsdf';
 const keySearch = 'batman';
 const specialChar = "%$#@#$%^%$#@#$%$#@!@#$%^%$#@";
 const varlongString = "wuqidkagskfjhsavfjhaggfajsfshfgjahfzksabkjabsfjkasfkjabsfjkasbfkjsadhwvqdjhvashjdvasjhvddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfkjbsakfjsajfbjsbfksjaksjb";
 const varTittle = "&t=batman";

 it(`@get ${testCase.positive.getList}`, async() => {
  const response = await page.getMovieList(apiKey, keySearch);
  assert(response.status).to.equal(200);
 }),

 it(`@get ${testCase.negative.noSearch}`, async() => {
  const response = await page.getMovieList(apiKey, '');
  assert(response.status).to.equal(200, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('Something went wrong.');
 }),

 it(`@get ${testCase.negative.invalidApiKey}`, async() => {
   const response = await page.getMovieList(invalidApiKey, keySearch);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Invalid API key!');
  }),

   it(`@get ${testCase.negative.searchSpecialcharacter}`, async() => {
   const response = await page.getMovieList(apiKey, specialChar);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Too many results.');
  }),

it(`@get ${testCase.negative.searchSpecialcharacter}`, async() => {
   const response = await page.getMovieList(apiKey, specialChar);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Too many results.');
  }),
it(`@get ${testCase.negative.apiKeyNull}`, async() => {
   const response = await page.getMovieList('', specialChar);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('No API key provided.');
  }),
it(`@get ${testCase.negative.longString}`, async() => {
   const response = await page.getMovieList(apiKey, varlongString);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Movie not found!');
  }),
it(`@get ${testCase.negative.searchParameter}`, async() => {
   const response = await page.getMovieList(apiKey, varTittle);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Movie not found!');
  })
}) 