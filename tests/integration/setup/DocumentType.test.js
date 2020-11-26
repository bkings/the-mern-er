const request = require('supertest');
const { DocumentType } = require('../../../models/setup/DocumentType');
const { User } = require('../../../models/utility/User');

let server;

describe('/api/documentType', () => {
    beforeEach(() => {
        server = require('../../../index')
    });

    afterEach(async () => {
        await server.close();
        await DocumentType.deleteMany();
    });

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
            const res = await request(server)
                .post('/api/documentType')
                .send({
                    docType: "PP",
                    docName: "Passport"
                });
            expect(res.status).toBe(401);
        })
    })
})