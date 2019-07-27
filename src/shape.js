import * as THREE from 'three';


export default class Shape {

    constructor(
        geo,
        mat,
        config=[]
    ){
        this.geo = geo;
        this.mat = mat;        
        this.self = new THREE.Mesh(geo,mat);
    }

    add(scene){
        scene.add(self);
    }
    

}