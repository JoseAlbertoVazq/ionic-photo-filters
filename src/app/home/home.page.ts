import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedFilter = '';
  selectedIndex = 0;
  result: HTMLElement;
  image: any = '';
  slideOpts = {
    slidesPerView: 3.5,
    spaceBetween: 5,
    slidesOffsetBefore: 20,
    freeMode: true
  };
  filterOptions = [
    { name: 'Normal', value: '' },
    { name: 'Sepia', value: 'sepia' },
    { name: 'Blue Monotone', value: 'blue_monotone' },
    { name: 'Violent Tomato', value: 'violent_tomato' },
    // { name: 'Grey', value: 'greyscale' },
    // { name: 'Brightness', value: 'brightness' },
    // { name: 'Saturation', value: 'saturation' },
    // { name: 'Contrast', value: 'contrast' },
    // { name: 'Hue', value: 'hue' },
    // { name: 'Cookie', value: 'cookie' },
    // { name: 'Vintage', value: 'vintage' },
    // { name: 'Koda', value: 'koda' },
    // { name: 'Technicolor', value: 'technicolor' },
    // { name: 'Polaroid', value: 'polaroid' },
    // { name: 'Bgr', value: 'bgr' }
  ];
  constructor() { }
  async selectImage() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = image.dataUrl;
  }
  filter(index) {
    this.selectedFilter = this.filterOptions[index].value;
    this.selectedIndex = index;
  }
  // How to save a base64 string as a file? Here you have the question:
  // https://stackoverflow.com/questions/16996319/javascript-save-base64-string-as-file
  // but this is a dummy method
  downloadBase64File(base64) {
    const linkSource = `${base64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'photoFilter.png';
    downloadLink.click();
  }

  // With the previous method now we can save the image in the device
  saveImage() {
    let base64 = '';
    if (!this.selectedFilter) {
      // Use the original image! There is no filters applied in that photo
      base64 = this.image;
    } else {
      let canvas = this.result as HTMLCanvasElement;
      // export as dataUrl or Blob!
      base64 = canvas.toDataURL('image/jpeg', 1.0);
    }
 
    // Do whatever you want with the result, e.g. download on desktop
    this.downloadBase64File(base64);
  }
}
