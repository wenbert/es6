export function showProject() { console.log('in original'); }

export function updateFunction() {
  showProject = function () { console.log('in updated'); };
}