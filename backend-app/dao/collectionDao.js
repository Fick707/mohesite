/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const _ = require('lodash');
const log = require('log4js').getLogger('Collection dao');
const em = require('../domain/entityManager');
const CatalogItem = require('../messages/CatalogItem');

var findTop10CollectionMetaData = async function(){
    var collections = await collectionModal.findAll({
        attributes: ['id', 'title', 'introduction', 'catalogNum', 'image', 'readCount', 'collectionType', 'keyWord', 'createdAt' ],
        order:'readCount desc, id desc',
        limit:10
    });
    var result = [];
    _.each(collections, function(collection){
       result.push(collection.dataValues) ;
    });
    return result;
};

var findCollectionMetaDataByCollectionId = async(collectionId) =>{
    var collectionQuery =  await em.query('select id, collection_type as collectionType, catalogNum from collections where id = ?',{ replacements: [collectionId], type: em.QueryTypes.SELECT });
    var collectionMeta = collectionQuery[0];
    return collectionMeta;
};

module.exports={
    findTop10CollectionMetaData: findTop10CollectionMetaData,
    findCollectionMetaDataByCollectionId: findCollectionMetaDataByCollectionId
};