import { Component, OnInit, OnDestroy } from '@angular/core'
import { ThreeComponent } from './three.component'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  template: '',
})
// tslint:disable-next-line: component-class-suffix
export abstract class ThreeNode implements OnInit, OnDestroy {
  get renderer() {
    return this.three.renderer
  }
  get scene() {
    return this.three.scene
  }
  get camera() {
    return this.three.camera
  }
  get controls() {
    return this.three.controls
  }

  constructor(public three: ThreeComponent) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
