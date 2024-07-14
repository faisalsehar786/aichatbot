import { login, signup } from './actions';
import Layout from './../../components/Layout';
export default function LoginPage() {
  return (
    <Layout>
      <div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10 m-auto">
        <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
          <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
            <form
              className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
              noValidate="novalidate"
              id="kt_sign_up_form"
              data-kt-redirect-url="authentication/layouts/overlay/sign-in.html"
              action="#"
            >
              <div className="text-center mb-11">
                <h1 className="text-gray-900 fw-bolder mb-3">Sign Up</h1>
                <div className="text-gray-500 fw-semibold fs-6">
                  Your Social Campaigns
                </div>
              </div>
              <div className="row g-3 mb-9">
                <div className="col-md-6">
                  <a
                    href="#"
                    className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
                  >
                    <img
                      alt="Logo"
                      src="assets/media/svg/brand-logos/google-icon.svg"
                      className="h-15px me-3"
                    />
                    Sign in with Google
                  </a>
                </div>
                <div className="col-md-6">
                  <a
                    href="#"
                    className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
                  >
                    <img
                      alt="Logo"
                      src="assets/media/svg/brand-logos/apple-black.svg"
                      className="theme-light-show h-15px me-3"
                    />
                    <img
                      alt="Logo"
                      src="assets/media/svg/brand-logos/apple-black-dark.svg"
                      className="theme-dark-show h-15px me-3"
                    />
                    Sign in with Apple
                  </a>
                </div>
              </div>
              <div className="separator separator-content my-14">
                <span className="w-125px text-gray-500 fw-semibold fs-7">
                  Or with email
                </span>
              </div>
              <div className="fv-row mb-8 fv-plugins-icon-container">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  className="form-control bg-transparent"
                />
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
              </div>
              <div
                className="fv-row mb-8 fv-plugins-icon-container"
                data-kt-password-meter="true"
              >
                <div className="mb-1">
                  <div className="position-relative mb-3">
                    <input
                      className="form-control bg-transparent"
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="off"
                    />
                    <span
                      className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                      data-kt-password-meter-control="visibility"
                    >
                      <i className="ki-duotone ki-eye-slash fs-2" />
                      <i className="ki-duotone ki-eye fs-2 d-none" />
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center mb-3"
                    data-kt-password-meter-control="highlight"
                  >
                    <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2 active" />
                    <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
                    <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
                    <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px" />
                  </div>
                </div>
                <div className="text-muted">
                  Use 8 or more characters with a mix of letters, numbers &amp;
                  symbols.
                </div>
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
              </div>
              <div className="fv-row mb-8 fv-plugins-icon-container">
                <input
                  placeholder="Repeat Password"
                  name="confirm-password"
                  type="password"
                  autoComplete="off"
                  className="form-control bg-transparent"
                />
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
              </div>
              <div className="fv-row mb-8 fv-plugins-icon-container">
                <label className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="toc"
                    defaultValue={1}
                  />
                  <span className="form-check-label fw-semibold text-gray-700 fs-base ms-1">
                    I Accept the
                    <a href="#" className="ms-1 link-primary">
                      Terms
                    </a>
                  </span>
                </label>
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
              </div>
              <div className="d-grid mb-10">
                <button
                  type="submit"
                  id="kt_sign_up_submit"
                  className="btn btn-primary"
                >
                  <span className="indicator-label">Sign up</span>
                  <span className="indicator-progress">
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
                </button>
              </div>
              <div className="text-gray-500 text-center fw-semibold fs-6">
                Already have an Account?
                <a
                  href="authentication/layouts/overlay/sign-in.html"
                  className="link-primary fw-semibold"
                >
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

{
  /* <form>
<label htmlFor="email">Email:</label>
<input id="email" name="email" type="email" required />
<label htmlFor="password">Password:</label>
<input id="password" name="password" type="password" required />
<button formAction={login}>Log in</button>
<button formAction={signup}>Sign up</button>
</form> */
}
