db.createUser(
    {
        user: "intactsys",
        pwd: "intactsys",
        roles: [
            {
                role: "readWrite",
                db: "intactsys"
            }
        ]
    }
);

db.createCollection("userStudy");