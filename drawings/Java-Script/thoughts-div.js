document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('see-my-thoughts-btn').addEventListener('click', function () {
        const hiddenDiv = document.getElementById('see-my-thoughts-div');
        hiddenDiv.style.display = hiddenDiv.style.display === 'none' ? 'flex' : 'none';
    });
});
