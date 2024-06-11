import { videoPaths } from './videoPaths';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', function() {
        const query = document.getElementById('search-bar').value.toLowerCase();
        const results = videoPaths.filter(path => path.toLowerCase().includes(query));
        
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        results.forEach((path, _) => {
            const resultItem = document.createElement('div');
            resultItem.textContent = path.split('SoccerNet_in_lrlab')[1];
            resultItem.className = 'result-item';
            resultItem.addEventListener('click', () => {
                selectVideo(path);
            });
            resultsContainer.appendChild(resultItem);
        });

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div>No results found</div>';
        }
    });

    document.getElementById('jump-button').addEventListener('click', function() {
        const timeInput = document.getElementById('time-input').value;
        const videoElement = document.getElementById('my-video');

        if (videoElement && timeInput) {
            const timeInSeconds = parseTimeInput(timeInput);
            if (timeInSeconds !== null) {
                videoElement.currentTime = timeInSeconds;
                videoElement.play();
            } else {
                alert('Invalid time format');
            }
        }
    });

    document.getElementById('rewind-button').addEventListener('click', function() {
        const videoElement = document.getElementById('my-video');
        if (videoElement) {
            videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
        }
    });

    document.getElementById('forward-button').addEventListener('click', function() {
        const videoElement = document.getElementById('my-video');
        if (videoElement) {
            videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
        }
    });
});
function selectVideo(videoPath) {
    // (event trigger) Load the selected video
    const videoElement = document.getElementById('my-video');
    const sourceElement = document.getElementById('video-source');
    sourceElement.src = videoPath;
    videoElement.load();

    // Display the current match path
    const matchPath = videoPath.split('SoccerNet_in_lrlab')[1];
    document.getElementById('current-match').textContent = matchPath;
}

function parseTimeInput(input) {
    // Parse time in the format MM:SS or MM:SS:MS
    // return time in seconds or null if invalid
    const parts = input.split(':');
    if (parts.length === 2 || parts.length === 3) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        if (!isNaN(minutes) && !isNaN(seconds)) {
            return minutes * 60 + seconds;
        }
    }
    return null;
}
