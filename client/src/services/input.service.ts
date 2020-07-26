import UIKit from 'uikit';

class InputService {
  static getUsername(onComplete: (username: string) => void): void {
    UIKit.modal.prompt('Please Enter a New Username.', '')
      .then((value: string) => value ? onComplete(value) : null);
  }

  static updateUsername(oldUsername: string, onComplete: (oldUsername: string, newUsername: string) => void): void {
    UIKit.modal.prompt(`Please Enter a Replacement Username for ${oldUsername}.`, '')
      .then((value: string) => value ? onComplete(oldUsername, value) : null);
  }

  static deleteUsername(username: string, onDelete: (username: string) => void): void {
    UIKit.modal.confirm(`Are You Sure You Want to Remove ${username}?`)
      .then(() => onDelete(username))
      .catch(()=>{});
  }
}

export default InputService;
