window.onload = () => {
    const redirectWithRoomId = element => {
        element.addEventListener('click', () => {
            const room = prompt('Room name')
            if (!room) {
                alert('wrong room')
                return;
            }

            window.open('/pages/room/?room=' + room);

        })
    }
    const join = document.getElementById('join')
    const newMeeting = document.getElementById('new-meeting')
    
    redirectWithRoomId(join)
    redirectWithRoomId(newMeeting)
}