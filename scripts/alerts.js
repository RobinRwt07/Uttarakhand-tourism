
export function showAlert(type = "success", message = "") {
  let color = {
    success: "#00da00",
    error: "#FF0000",
    info: "#00EA00"
  }
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alertDiv");
  alertDiv.innerHTML = `
    <div>${message}</div>
    <div class="close" onclick="this.parentElement.remove()">&times;</div>`
  alertDiv.style.backgroundColor = color[type];
  document.body.append(alertDiv);
  setTimeout(() => {
    alertDiv.remove();
  }, 2000)
}
