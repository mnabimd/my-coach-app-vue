import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCourseTitle from './components/ui/BaseCourseTitle.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseContainer from './components/ui/BaseContainer.vue';
import BaseButtonSecondary from './components/ui/BaseButtonSecondary.vue';
import BaseInput from './components/ui/BaseInput.vue';
import BaseForm from './components/ui/BaseForm.vue';
import BaseToast from './components/ui/BaseToast.vue';
import BaseModal from './components/ui/BaseModal.vue';
import BaseFloatButton from './components/ui/BaseFloatButton.vue';

// Use css variables...
import './theme/variables.css';
import 'boxicons';

const app = createApp(App)



app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-course-title', BaseCourseTitle);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('base-container', BaseContainer);
app.component('base-button-secondary', BaseButtonSecondary);
app.component('base-input', BaseInput);
app.component('base-form', BaseForm);
app.component('base-toast', BaseToast);
app.component('base-modal', BaseModal);
app.component('base-float-button', BaseFloatButton);

app.mount('#app');
