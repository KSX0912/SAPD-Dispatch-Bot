const logger =
    require('../utils/logger');



class DispatchSessionService {


    constructor() {


        /*
            Active Dispatch Sessions

            Key:
            guildId:userId
        */

        this.sessions =
            new Map();

    }





    /**
     * Create new dispatch session
     */
    create(
        guildId,
        userId,
        data = {}
    ) {


        const key =
            this.getKey(
                guildId,
                userId
            );



        const session = {


            guildId,

            userId,


            location:
                null,


            situation:
                null,


            additionalNotes:
                null,


            priority:
                null,


            requestedUnits:
                [],


            createdBy:
                userId,


            createdAt:
                new Date(),


            ...data


        };




        this.sessions.set(

            key,

            session

        );




        logger.debug(

            {
                guildId,
                userId
            },

            'Dispatch session created'

        );



        return session;


    }







    /**
     * Get session
     */
    get(
        guildId,
        userId
    ) {


        return this.sessions.get(

            this.getKey(
                guildId,
                userId
            )

        );


    }







    /**
     * Update session
     */
    update(
        guildId,
        userId,
        data
    ) {


        const session =
            this.get(
                guildId,
                userId
            );



        if (!session) {

            return null;

        }




        Object.assign(

            session,

            data

        );



        return session;


    }







    /**
     * Delete session
     */
    delete(
        guildId,
        userId
    ) {


        return this.sessions.delete(

            this.getKey(

                guildId,

                userId

            )

        );


    }







    /**
     * Check Session Exists
     */
    has(
        guildId,
        userId
    ) {


        return this.sessions.has(

            this.getKey(

                guildId,

                userId

            )

        );


    }







    /**
     * Clear all sessions
     */
    clear() {


        this.sessions.clear();



        logger.info(

            'All dispatch sessions cleared'

        );


    }







    /**
     * Active Session Count
     */
    count() {


        return this.sessions.size;


    }







    /**
     * Cleanup expired sessions
     */
    cleanup(
        expirationMinutes = 15
    ) {


        const now =
            Date.now();


        let removed = 0;



        for (
            const [
                key,
                session
            ]
            of this.sessions.entries()
        ) {



            const age =

                now -

                session.createdAt.getTime();




            if (

                age >

                expirationMinutes * 60 * 1000

            ) {



                this.sessions.delete(
                    key
                );


                removed++;


            }


        }





        if (removed > 0) {


            logger.info(

                {
                    removed
                },

                'Expired dispatch sessions cleaned'

            );


        }



        return removed;


    }







    /**
     * Debug Sessions
     */
    getAll() {


        return Array.from(

            this.sessions.values()

        );


    }







    /**
     * Generate Key
     */
    getKey(
        guildId,
        userId
    ) {


        return `${guildId}:${userId}`;


    }


}



module.exports =
    new DispatchSessionService();