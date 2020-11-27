const request = require('supertest');
const { DocumentType } = require('../../../models/setup/DocumentType');
const { User } = require('../../../models/utility/User');

let server, token, docType, docName;

describe('/api/documentType', () => {
    beforeEach(() => {
        server = require('../../../index');
        token = new User().generateToken();
    });

    afterEach(async () => {
        await server.close();
        await DocumentType.deleteMany();
    });

    execPost = () => {
        return request(server)
            .post('/api/documentType')
            .set('x-token', token)
            .send({
                docType,
                docName
            });
    }

    describe('GET', () => {
        it('should return all document types', async () => {
            const documentTypes = [{
                "docType": "L",
                "docName": "License"
            }, {
                "docType": "CC",
                "docName": "Citizenship Certificate"
            }];

            await DocumentType.collection.insertMany(documentTypes);

            const res = await request(server).get('/api/documentType');

            expect(res.status).toBe(200);
            expect(res.body.documentTypes.length).toBe(2);
            expect(res.body.documentTypes.some(d => d.docType === 'L')).toBeTruthy();
            expect(res.body.documentTypes.some(d => d.docType === 'CC')).toBeTruthy();
        });
    });

    describe('POST', () => {
        it('should return 401 if user is unauthorized', async () => {
            docType = "PP", docName = "Passport", token = "";
            const res = await execPost();
            expect(res.status).toBe(401);
        });

        it('should return 400 if doctype length is less than 1', async () => {
            docType = "", docName = "Name of doc";
            const res = await execPost();
            expect(res.status).toBe(400);
        });

        it('should return 400 if doctype length is more than 3', async () => {
            docType = "ABCD", docName = "Name of doc";
            const res = await execPost();
            expect(res.status).toBe(400);
        });

    })
})