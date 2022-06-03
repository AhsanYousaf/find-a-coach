export default {
    async contactCoach(context,payload) {
        const newRequest = {
        userEmail: payload.email,
        message: payload.message
        };

        const response = await fetch(`https://coach-vue-app-d8e10-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error( responseData.message || 'Failed to send requests' );
            throw error;
        }

        
        newRequest.id = responseData.name; 
        newRequest.coachId = payload.coachId;

        context.commit('addRequest',newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://coach-vue-app-d8e10-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();

        if ( !response.ok ) {
            const error = new Error( responseData.message || 'Failed to load requests' );
            throw error;
        }
        const requests = [];

        for ( const key in responseData ) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }
        context.commit('setRequests', requests);
    }
};