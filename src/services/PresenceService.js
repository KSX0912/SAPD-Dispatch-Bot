const {
    ActivityType
} = require('discord.js');


const DispatchRepository =
    require('../repositories/DispatchRepository');


const logger =
    require('../utils/logger');




class PresenceService {


    constructor() {

        this.client = null;

        this.interval = null;

    }





    /**
     * Initialize Presence Service
     */
    initialize(client) {

        this.client = client;


        /*
            Initial Update
        */

        this.update();


        /*
            Refresh every 30 seconds
        */

        this.interval = setInterval(

            () => this.update(),

            30000

        );


        logger.info(
            'Presence Service initialized.'
        );

    }





    /**
     * Update Bot Presence
     */
    async update() {

        if (!this.client) {

            return;

        }


        try {

            const activeDispatches =
                DispatchRepository.getActiveCount();


            let activity = 'No Active Dispatches';


            if (activeDispatches === 1) {

                activity =
                    '1 Active Dispatch';

            }

            else if (activeDispatches > 1) {

                activity =
                    `${activeDispatches} Active Dispatches`;

            }


            this.client.user.setPresence({

                status: 'online',

                activities: [

                    {

                        name: activity,

                        type: ActivityType.Watching

                    }

                ]

            });

        }

        catch (error) {

            logger.error({

                error:
                    error.message

            },
            'Presence update failed');

        }

    }


}


module.exports =
    new PresenceService();