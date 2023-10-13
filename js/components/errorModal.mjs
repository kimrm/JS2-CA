export default ({ heading, body, errors = [] }) => `
<div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-danger text-bg-danger">
            <h5 class="modal-title" id="errorModalLabel">${heading}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ${body}
            <ul>
            ${errors.map((error) => `<li>${error.message}</li>`).join("")}
            </ul>
        </div>
        </div>
    </div>
</div>
`;
