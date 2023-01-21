type AlertType = "error" | "success";

export function printAlert(msg: string, type: AlertType, place: HTMLElement) {

    if (place.querySelector(".local-alert")) {//si ya esta mostrada la alerta, salimos
        return;
    }

    const alert_div = document.createElement("div");

    alert_div.classList.add("px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center", "border", "local-alert");

    if (type === "error") {
        alert_div.classList.add("bg-red-100", "border-red-400", "text-red-700");
    } else {
        alert_div.classList.add("bg-green-100", "border-green-400", "text-green-700");
    }

    alert_div.textContent = msg;

    place.append(alert_div);

    setTimeout(() => {
        alert_div.remove();
    }, 2000);
}
