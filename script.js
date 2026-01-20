document.addEventListener("DOMContentLoaded", () => {

  // Verificar que Firebase esté cargado
  if (typeof firebase === "undefined") {
    alert("Firebase no está cargando. Revisa los scripts.");
    return;
  }

  const auth = firebase.auth();

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const msgBox = document.getElementById("msg");

  function showMessage(text, isError = false) {
    if (!msgBox) return;
    msgBox.textContent = text;
    msgBox.style.color = isError ? "red" : "green";
  }

  // VALIDACIÓN DE EMAIL
  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // REGISTRO
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      if (!emailValido(email)) {
        showMessage("Correo inválido", true);
        return;
      }

      if (password.length < 6) {
        showMessage("La contraseña debe tener mínimo 6 caracteres", true);
        return;
      }

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          showMessage("Usuario creado correctamente");
          registerForm.reset();
        })
        .catch((error) => {
          manejarErrorFirebase(error);
        });
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!emailValido(email)) {
        showMessage("Correo inválido", true);
        return;
      }

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
         window.location.href = "Dashboard.html";
        })
        .catch((error) => {
          manejarErrorFirebase(error);
        });
    });
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      });
    });
  }

  // PROTECCIÓN DEL DASHBOARD
  auth.onAuthStateChanged((user) => {
    if (!user && window.location.pathname.includes("dashboard")) {
      window.location.href = "index.html";
    }
  });

  // TRADUCTOR DE ERRORES DE FIREBASE
  function manejarErrorFirebase(error) {
    console.error(error);

    switch (error.code) {
      case "auth/email-already-in-use":
        showMessage("Este correo ya está registrado", true);
        break;

      case "auth/invalid-email":
        showMessage("Correo inválido", true);
        break;

      case "auth/weak-password":
        showMessage("Contraseña muy débil (mínimo 6 caracteres)", true);
        break;

      case "auth/operation-not-allowed":
        showMessage("Email/Password no está activado en Firebase", true);
        break;

      case "auth/network-request-failed":
        showMessage("Error de conexión. Usa https://", true);
        break;

      case "auth/invalid-api-key":
        showMessage("API Key inválida. Revisa firebase-config.js", true);
        break;

      default:
        showMessage("Error: " + error.message, true);
    }
  }

});

