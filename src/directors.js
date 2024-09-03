document.addEventListener('DOMContentLoaded', function () {
  // Fade in function
  function observeElements(selector, className = 'visible') {
    const elements = document.querySelectorAll(selector)

    if (elements.length === 0) {
      console.warn(`No elements found for selector: ${selector}`)
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(className)
          }, 500) // Small delay to trigger the fade-in effect
        }
      })
    })

    elements.forEach(element => observer.observe(element))
  }

  // Elements to observe
  const selectors = ['.section', '.directors__work', '.director__bio-container']
  selectors.forEach(selector => observeElements(selector, 'visible'))
})
