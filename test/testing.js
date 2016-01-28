
process.env.NODE_ENV = 'testing'
var models = require('../models');
var User = models.User;
var Page = models.Page;
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var mongoose = require('mongoose');

describe('Page model', function() {

 describe('Validations', function() {
   describe('newPage', function() {

     var page;
     beforeEach(function(){
       page = new Page({
       });
     });
     it('errors without title', function (done) {
       page.save(function(err){
         expect(err.errors).to.have.property('title');
         done();
       })
     });
     it('errors without content', function (done) {
       page.save(function(err){
         expect(err.errors).to.have.property('content');
         done();
       })
     });
   });
 });

 describe('Hooks', function () {
   xit('it uses the convert function and sets urlTitle based on title before validating', function () {
   })
 });

 describe('Virtuals', function() {
   describe('route', function() {
     xit('returns the url_name prepended by "/wiki/"', function() {});
   })
 });

 describe('Statics', function() {
  afterEach(function(){
    return Page.remove({});
  })


   describe('findByTag', function() {
     beforeEach(function(done) {
       Page.create({
         title: 'foo',
         content: 'bar',
         tags: ['foo', 'bar']
       }, done)
     })
     it('gets pages with the search tag', function(done) {
       Page.findByTag('bar').then(function(pages){
         console.log(pages);
         expect(pages).to.have.lengthOf(1);
         done();
       }).then(null, done);
     });
     it('does not get pages without the search tag', function() {
       return Page.findByTag('food').then(function(pages){
         expect(pages).to.have.lengthOf(0);
       });

     });
   });
   describe('Find or Create', function() {
     afterEach(function(){
      return User.remove({});
     })

     it('creates a user if it doesn\'t exist', function() {
       chai.spy.on(User, 'create')
       return User.findOrCreate({ name: "APon25", email: "Testis"})
           .then(function(foundSlashCreatedUser){
             expect(User.create).to.have.been.called.exactly(1);
             expect(foundSlashCreatedUser.name).to.equal("APon25");
           });
     });


   })
 });

 describe('Methods', function() {
   describe('findSimilar', function() {
     xit('never gets itself', function() {});
     xit('gets other pages with any common tags', function() {});
     xit('does not get other pages without any common tags', function() {});
   });
 });

});