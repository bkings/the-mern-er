const mongoose = require('mongoose');
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

            const res = await request(server).get('/api/documentType').set('x-token', token);

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

        it('should return 400 if the document type already exists', async () => {
            const documentType = new DocumentType({ docType: "L", docName: "name" });
            await documentType.save();

            docType = "L", docName = "names new";
            const res = await execPost();
            expect(res.status).toBe(400);
        })

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

        it('should save data if valid', async () => {
            docType = "LC", docName = "License";
            const res = await execPost();
            const documentType = await DocumentType.find({ docType: "LC" });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Success");
            expect(documentType).not.toBe(null);
        });
    });

    describe('PUT', () => {
        let documentType, id, newDocName, newDocType;

        beforeEach(async () => {
            documentType = new DocumentType({ docType: "LC", docName: "License" });
            await documentType.save();

            id = documentType._id;
            newDocName = 'new doc name';
            newDocType = 'LM';
        });

        const execPut = () => {
            return request(server)
                .put('/api/documentType/' + id)
                .set('x-token', token)
                .send({ docType: newDocType, docName: newDocName });
        }

        it('should return 401 if unauthorized', async () => {
            token = '';
            const res = await execPut();
            expect(res.status).toBe(401);
        });

        it('should return 404 if id not found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await execPut();
            expect(res.status).toBe(404);
        });
    })

})