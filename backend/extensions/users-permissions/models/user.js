module.exports = {
    beforeCreate(data) {
        if(!data.username) {
            data.username = data.email.split('@')[0]
        }
    }
}