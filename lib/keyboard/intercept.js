function interceptKeyEvent(originalKey, newKey) {
    document.addEventListener('keydown', function(event) {
        // Check if the pressed key is the originalKey
        if (event.key === originalKey) {
            // Prevent the default action for the originalKey
            event.preventDefault();

            // Create a new keyboard event for the newKey
            let newEvent = new KeyboardEvent('keydown', {
                key: newKey,
                code: `Key${newKey.toUpperCase()}`,
                keyCode: newKey.charCodeAt(0), // The keyCode for the newKey
                charCode: newKey.charCodeAt(0), // The charCode for the newKey
                which: newKey.charCodeAt(0), // The which value for the newKey
                bubbles: true,
                cancelable: true
            });

            // Dispatch the new event
            document.dispatchEvent(newEvent);
        }
    });
}

interceptKeyEvent('ArrowUp', '1');

interceptKeyEvent('ArrowDown', '2');