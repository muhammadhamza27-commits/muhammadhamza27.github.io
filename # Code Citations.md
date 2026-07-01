# Code Citations

## License: CC-BY-SA-4.0
https://github.com/wenerme/wener/blob/0e1da8905f06f862cf683a37d93ce6d8b679c3ac/notes/platform/vercel/README.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with
```


## License: CC-BY-SA-4.0
https://github.com/wenerme/wener/blob/0e1da8905f06f862cf683a37d93ce6d8b679c3ac/notes/platform/vercel/README.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with
```


## License: unknown
https://github.com/oktadev/okta-blog/blob/827cf81504ea51eaf476bf5e544b1fa68d9ab457/_source/_posts/2020-05-29-angular-deployment.adoc

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with security headers
theme: jekyll-theme-minimal
plugins:
  - jekyll-redirect-from
```

---

### **5. No Form Input
```


## License: unknown
https://github.com/kilgarenone/sametable-website/blob/3bc81a163821be9fb997373e7cbfad43621fa09e/blog/how-to-build-your-first-saas.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with security headers
theme: jekyll-theme-minimal
plugins:
  - jekyll-redirect-from
```

---

### **5. No Form Input
```


## License: CC-BY-SA-4.0
https://github.com/wenerme/wener/blob/0e1da8905f06f862cf683a37d93ce6d8b679c3ac/notes/platform/vercel/README.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with
```


## License: unknown
https://github.com/oktadev/okta-blog/blob/827cf81504ea51eaf476bf5e544b1fa68d9ab457/_source/_posts/2020-05-29-angular-deployment.adoc

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with security headers
theme: jekyll-theme-minimal
plugins:
  - jekyll-redirect-from
```

---

### **5. No Form Input
```


## License: unknown
https://github.com/kilgarenone/sametable-website/blob/3bc81a163821be9fb997373e7cbfad43621fa09e/blog/how-to-build-your-first-saas.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with security headers
theme: jekyll-theme-minimal
plugins:
  - jekyll-redirect-from
```

---

### **5. No Form Input
```


## License: CC-BY-SA-4.0
https://github.com/wenerme/wener/blob/0e1da8905f06f862cf683a37d93ce6d8b679c3ac/notes/platform/vercel/README.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with
```


## License: unknown
https://github.com/oktadev/okta-blog/blob/827cf81504ea51eaf476bf5e544b1fa68d9ab457/_source/_posts/2020-05-29-angular-deployment.adoc

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with security headers
theme: jekyll-theme-minimal
plugins:
  - jekyll-redirect-from
```

---

### **5. No Form Input
```


## License: unknown
https://github.com/kilgarenone/sametable-website/blob/3bc81a163821be9fb997373e7cbfad43621fa09e/blog/how-to-build-your-first-saas.md

```
# 🔒 Security Analysis Report

After thoroughly analyzing your portfolio website code, I've identified **15 security risks** with simple solutions. Here's the breakdown:

---

## **🔴 CRITICAL ISSUES**

### **1. No Content Security Policy (CSP)**
**Risk**: CDN scripts (GSAP, Lenis, Google Fonts) lack integrity verification. A compromised CDN could inject malicious code.

**Current**: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Solution**: Add CSP header + Subresource Integrity (SRI) hashes:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
  integrity="sha512-xDB8Fc84MB2scWHVg9zsI2bYT8E7C7KRbj3uaI+F3nSEU2r8p2Df2eEVVeflotl9HF1+OnMic4QWBf4gVqXdzw==" 
  crossorigin="anonymous"></script>
```

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'nonce-random123'; 
  style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline';
  img-src 'self' https: data:;
  font-src https://fonts.gstatic.com;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';">
```

---

### **2. Exposed Formspree Form ID (SPAM/ABUSE RISK)**
**Risk**: Form endpoint `xnjkbzyp` is hardcoded in HTML. Bots can scrape and spam your form.

**Current**:
```html
<form action="https://formspree.io/f/xnjkbzyp" method="POST">
```

**Solutions**:
- **Option A** (Simple): Enable CAPTCHA on Formspree dashboard
- **Option B** (Better): Use Formspree's built-in rate limiting feature
- **Option C** (Best): Switch to a backend service with rate limiting (Nodemailer, SendGrid, Resend)

---

### **3. Email Address Harvesting (BOT SCRAPING)**
**Risk**: Email `m.hamza.2007.2022@gmail.com` is visible in plain HTML.

**Current**:
```html
<a href="mailto:m.hamza.2007.2022@gmail.com" class="directory-link copy-email">Copy Email</a>
```

**Solution**: Obfuscate email in HTML, reveal only via JavaScript:
```html
<!-- Before: Remove from HTML -->
<!-- After: Add this -->
<a id="email-link" href="#" class="directory-link copy-email">Copy Email</a>

<!-- Add to script.js -->
<script>
  document.getElementById('email-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); // base64 encoded
    navigator.clipboard.writeText(email);
    showToast('✓ Email copied');
  });
</script>
```

---

## **🟠 HIGH PRIORITY**

### **4. Missing Security Headers**
**Add to your hosting provider** (or `.htaccess` / `vercel.json`):

```json
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    },
    {
      "key": "Referrer-Policy",
      "value": "strict-origin-when-cross-origin"
    },
    {
      "key": "Permissions-Policy",
      "value": "geolocation=(), microphone=(), camera=()"
    }
  ]
}
```

**For GitHub Pages**, add a `_config.yml`:
```yaml
# Jekyll config with security headers
theme: jekyll-theme-minimal
plugins:
  - jekyll-redirect-from
```

---

### **5. No Form Input
```

