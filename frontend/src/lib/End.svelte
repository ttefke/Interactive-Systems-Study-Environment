<script>
    import axios from "axios";
    import { studyData } from "./data.js";

    let dataStored = false;
    let userId = -1;

    axios
        .post("./api/uploadData", studyData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then(function (response) {
            dataStored = response.data.success;
            userId = response.data.userId;
        });
</script>

{#if dataStored}
    <p>
        Thank you for participating in the user study. Your input information
        was saved successfully.
    </p>
    <p>
        Your user ID is {userId}. Please note this ID on the questionaire.
    </p>
{:else}
    <p>Your data was not saved. An error occurred</p>
{/if}
