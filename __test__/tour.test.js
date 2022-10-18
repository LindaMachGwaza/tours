import chai from 'chai';
import chaihttp from 'chai-http';
import index from '../index.js';

chai.should();
chai.use(chaihttp);

//Test tour api get function should get tours in the database
describe("Tours Api",() => {

    describe("GET ALL TOURS", () => {
        it("It should return a list of all tours",(done) => {
            chai.request(index)
            .get("/tour")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('title');
                response.body.should.have.property('description');
                response.body.should.have.property('creator')
                done()
            });
        });
    });
});

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
