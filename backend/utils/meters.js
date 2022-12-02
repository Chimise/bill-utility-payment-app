const discos = require('./discos');

module .exports = [
    {
        type: "postpaid",
        service_id: "AMB",
        min_amount: 100,
        disco: discos[0]._id
    },
    {
        type: "prepaid",
        service_id: "AMA",
        min_amount: 100,
        disco: discos[0]._id
    },
    {
        type: "prepaid",
        service_id: "ANA",
        min_amount: 1000,
        disco: discos[1]._id
    },
    {
        type: "postpaid",
        service_id: "ANB",
        min_amount: 100,
        disco: discos[1]._id
    },
    {
        type: "prepaid",
        service_id: "AHB",
        min_amount: 500,
        disco: discos[2]._id
    },
    {
        type: "postpaid",
        service_id: "AHA",
        min_amount: 100,
        disco: discos[2]._id
    },
    {
        type: "prepaid",
        service_id: "AGB",
        min_amount: 100,
        disco: discos[3]._id
    },
    {
        type: "postpaid",
        service_id: "AGA",
        min_amount: 100,
        disco: discos[3]._id
    },
    {
        type: "prepaid",
        service_id: "AEA",
        min_amount: 100,
        disco: discos[4]._id
    },
    {
        type: "postpaid",
        service_id: "AEB",
        min_amount: 100,
        disco: discos[4]._id
    },
    {
        type: "prepaid",
        service_id: "AFA",
        min_amount: 100,
        disco: discos[5]._id
    },
    {
        type: "postpaid",
        service_id: "AFB",
        min_amount: 100,
        disco: discos[5]._id
    },
    {
        type: "postpaid",
        service_id: "ADA",
        min_amount: 100,
        disco: discos[6]._id
    },
    {
        type: "prepaid",
        service_id: "ADB",
        min_amount: 100,
        disco: discos[6]._id
    },
    {
        type: "prepaid",
        service_id: "ACB",
        min_amount: 100,
        disco: discos[7]._id
    },
    {
        type: "prepaid",
        service_id: "ACA",
        min_amount: 100,
        disco: discos[7]._id
    }
]