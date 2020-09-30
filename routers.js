const express = require('express');
const routers = express.Router();
const client = require('./connection');
const ObjectId = require('mongodb').ObjectId;

routers.get('/', (req, res) => res.send('Hello World!'));
routers.get('/post/:id?', (req, res) => {
    if (req.params.id) res.send('artikel-' + req.params.id)
});
routers.get('/products', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('latihan');
        // kode untuk menampilkan list products
        const products = await db.collection('products').find().toArray();
        if (products.length > 0) {
            res.send({
                status: 'success',
                message: 'list products ditemukan',
                data: products
            });
        } else {
            res.send({
                status: 'success',
                message: 'list products tidak ditemukan',
            });
        }
    } else {
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        });
    }
});
routers.get('/product/:id', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('latihan')
        // kode untuk menampilkan single products
        const product = await db.collection('products').findOne({
            _id: ObjectId(req.params.id)
        });
        res.send({
            status: 'success',
            message: 'single product',
            data: product
        });
    } else {
        res.send('koneksi database gagal')
    }
});
routers.post('/product', async (req, res) => {
    if (client.isConnected()) {
        const {
            name,
            price,
            stock,
            status
        } = req.body;

        const db = client.db('latihan');
        // kode untuk menambah data product
        const result = await db.collection('products').insertOne({
            name: name,
            price: price,
            stock: stock,
            status: status
        });

        if (result.insertedCount == 1) {
            res.send({
                status: 'success',
                message: 'tambah product success',
            });
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal',
            });
        }
    } else {
        res.send('koneksi database gagal')
    }
});
routers.put('/product/:id', async (req, res) => {
    if (client.isConnected()) {
        const {
            name,
            price,
            stock,
            status
        } = req.body;
        const db = client.db('latihan');
        // kode untuk mengupdate data product
        const result = await db.collection('products').updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: {
                name: name,
                price: price,
                stock: stock,
                status: status
            }
        });
        if (result.matchedCount == 1) {
            res.send({
                status: 'success',
                message: 'update product success',
            });
        } else {
            res.send({
                status: 'warning',
                message: 'update product gagal',
            });
        }
    } else {
        res.send('koneksi database gagal')
    }
});
routers.delete('/product/:id', async(req, res) => {
    if (client.isConnected()) {
        const db = client.db('latihan')
        // kode untuk menghapus data product
        const result = await db.collection('products').deleteOne({
            _id: ObjectId(req.params.id)
        })
        if (result.deletedCount == 1) {
            res.send({
                status: 'success',
                message: 'delete product success',
            });
        } else {
            res.send({
                status: 'warning',
                message: 'delete product gagal',
            });
        }
    } else {
        res.send('koneksi database gagal')
    }
});

module.exports = routers;