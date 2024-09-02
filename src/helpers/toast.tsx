import { default as hotToast } from "react-hot-toast";

const toast = ({ title, message, type }: { title: string, message: string, type: "success" | "error" }) => {
  hotToast.custom((t) => (
    <div className={`toast bg-light ${t.visible ? 'd-block' : 'd-none'}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className={`me-auto text-dark`}>{title}</strong>
        <button type="button" className="btn-close" onClick={() => hotToast.dismiss(t.id)}></button>
      </div>
      <div className={`toast-body ${type === "success" ? "text-success" : "text-danger"}`}>
        {message}
      </div>
    </div>
  ), { duration: 3000 });
}

export default toast;