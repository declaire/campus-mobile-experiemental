const initialState = {
	messages: [],
	nextTimestamp: null,
	latestTimeStamp: null,
	hasUnreadMsgs: false,
	topics: [
		{
			'audienceId': 'all',
			'topics': [
				{
					'topicId': 'all',
					'topicMetadata': {
						'name': 'General',
						'description': 'General messages for the whole UCSD community.'
					}
				}
			]
		}
	]
}

function messages(state = initialState, action) {
	const newState = { ...state }

	switch (action.type) {
		case 'CLEAR_MESSAGE_DATA': {
			newState.messages = null
			return newState
		}
		case 'SET_TOPICS': {
			newState.topics = [...action.topics]
			return newState
		}
		case 'SET_MESSAGES': {
			const { messages: newMessages, nextTimestamp } = action
			newState.messages = [...newMessages]
			newState.nextTimestamp = nextTimestamp
			if (state.messages[0]) {
				if (newState.latestTimeStamp) {
					if (newState.latestTimeStamp < state.messages[0].timestamp) {
						newState.hasUnreadMsgs = true
					}
				}
			}
			else {
				newState.hasUnreadMsgs = true
			}
			newState.latestTimeStamp = newMessages[0].timestamp
			return newState
		}
		case 'CONFIRM_REGISTRATION': {
			newState.registered = true
			return newState
		}
		case 'CONFIRM_DEREGISTRATION': {
			newState.registered = false
			return newState
		}
		default:
			return state
	}
}

module.exports = messages
