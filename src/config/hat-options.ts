
export interface HatOption {
    id: string;
    name: string;
    description?: string;
    image: string; // Path to associated image
}

export interface HatOptionConfig {
    panelStyles: HatOption[];
    structures: HatOption[];
    fabrics: HatOption[];
    billStyles: HatOption[];
    closureStyles: HatOption[];
    frontDecoLocations: HatOption[];
    decorationTypes: HatOption[];
    secondDecoLocations: HatOption[];
    secondDecoTypes: HatOption[];
}

const DECO_LOCATION_IMAGE = '/design_assets/decorations/Headwear_Deco Locations.png';

export const HAT_OPTIONS: HatOptionConfig = {
    panelStyles: [
        { id: '5-panel', name: '5 Panel', image: '/design_assets/Style Panel/5 Panel Hat.png' },
        { id: '6-panel', name: '6 Panel Trucker', image: '/design_assets/Style Panel/6 Panel Trucker Hat.png' },
        { id: '7-panel', name: '7 Panel Trucker', image: '/design_assets/Style Panel/7 Panel Trucker Hat.png' },
        { id: 'foam-trucker', name: '5 Panel Foam', image: '/design_assets/Style Panel/5 Panel Foam Hat.png' },
    ],
    structures: [
        { id: 'structured', name: 'Structured', description: 'Firm front panel.', image: '/design_assets/Structure/Structured.jpeg' },
        { id: 'unstructured', name: 'Unstructured', description: 'Relaxed fit.', image: '/design_assets/Structure/Unstructured.jpeg' },
        { id: 'semi-structured', name: 'Semi-Structured', description: 'Medium firmness.', image: '/design_assets/Structure/semi-structured.jpeg' },
    ],
    fabrics: [
        { id: 'cotton-blend', name: 'Cotton Blend', image: '/design_assets/Fabric/Cotton Blend.jpeg' },
        { id: 'full-fabric', name: 'Full Fabric', image: '/design_assets/Fabric/Full Fabric.jpeg' },
        { id: 'laser-mesh', name: 'Laser Mesh', image: '/design_assets/Fabric/Laser Mesh.jpeg' },
        { id: 'polyester', name: 'Polyester', image: '/design_assets/Fabric/Polyester.jpeg' },
        { id: 'treated-blend', name: 'Treated Blend', image: '/design_assets/Fabric/Treated Blend.jpeg' },
        { id: 'wool-blend', name: 'Wool Blend', image: '/design_assets/Fabric/Wool Blend.jpeg' },
    ],
    billStyles: [
        { id: 'curved', name: 'Curved', image: '/design_assets/Bill/Curved Bill Cap.png' },
        { id: 'flat', name: 'Flat', image: '/design_assets/Bill/Flat Bill Cap.png' },
        { id: 'semi-curved', name: 'Semi-Curved', image: '/design_assets/Bill/Semi-Curved Bill Cap.png' },
    ],
    closureStyles: [
        { id: 'fabric-buckle', name: 'Fabric w/ Buckle', image: '/design_assets/Closure Style/Fabric w_ Buckle.jpg' },
        { id: 'hook-loop-velcro', name: 'Hook & Loop Velcro', image: '/design_assets/Closure Style/Hook & Loop Velcro.jpg' },
        { id: 'leather-buckle', name: 'Leather w/ Buckle', image: '/design_assets/Closure Style/Leather w_Buckle.jpg' },
        { id: 'snap-velcro', name: 'Snap Velcro', image: '/design_assets/Closure Style/Snap Velcro.jpg' },
        { id: 'standard-snap', name: 'Standard Snap', image: '/design_assets/Closure Style/Standard Snap.jpg' },
        { id: 'vertical-snap', name: 'Vertical Snap', image: '/design_assets/Closure Style/Vertical Snap.jpg' },
    ],
    frontDecoLocations: [
        { id: 'center', name: 'Center', image: '/design_assets/decorations/locations/Front Center.png' },
        { id: 'left', name: 'Left', image: '/design_assets/decorations/locations/Front Left.png' },
        { id: 'right', name: 'Right', image: '/design_assets/decorations/locations/Front Right.png' },
    ],
    decorationTypes: [
        { id: '3d-puff', name: '3D Puff Embroidery', image: '/design_assets/decorations/3D Puff Embroidery.jpg' },
        { id: 'flat-embroidery', name: 'Flat Embroidery', image: '/design_assets/decorations/Flat Embroidery.jpg' },
        { id: 'full-color-flat', name: 'Full Color Flat', image: '/design_assets/decorations/Full Color Flat.jpg' },
        { id: 'pvc-patch', name: 'PVC Patch', image: '/design_assets/decorations/PVC Patch.jpg' },
        { id: 'woven-patch', name: 'Woven Patch', image: '/design_assets/decorations/Brand MakersWoven Patch.jpg' },
        { id: 'screen-print', name: 'Screen Print', image: '/design_assets/decorations/Screen Print Flat.jpg' },
        { id: 'silicone-transfer', name: 'Silicone Transfer', image: '/design_assets/decorations/Silicone Transfer.webp' },
        { id: 'tpu-transfer', name: 'TPU Transfer', image: '/design_assets/decorations/TPU Transfer.jpg' },
        { id: 'tpu-flexstyle', name: 'TPU Flexstyle', image: '/design_assets/decorations/TPU_Flexstyle .jpg' },
    ],
    secondDecoLocations: [
        { id: 'none', name: 'None', image: '/design_assets/decorations/locations/Front Center.png' },
        { id: 'right-side', name: 'Right Side', image: '/design_assets/decorations/locations/Right Side.png' },
        { id: 'left-side', name: 'Left Side', image: '/design_assets/decorations/locations/Left Side.png' },
        { id: 'back-left', name: 'Back Left', image: '/design_assets/decorations/locations/Back Left.png' },
        { id: 'back-right', name: 'Back Right', image: '/design_assets/decorations/locations/Back Right.png' },
        { id: 'underbill', name: 'Underbill', image: '/design_assets/decorations/locations/Underbill.png' },
        { id: 'back-over-opening', name: 'Back Over Opening', image: '/design_assets/decorations/locations/Curved Above Closure.png' },
    ],
    secondDecoTypes: [
        { id: '3d-puff', name: '3D Puff Embroidery', image: '/design_assets/decorations/3D Puff Embroidery.jpg' },
        { id: 'flat-embroidery', name: 'Flat Embroidery', image: '/design_assets/decorations/Flat Embroidery.jpg' },
        { id: 'full-color-flat', name: 'Full Color Flat', image: '/design_assets/decorations/Full Color Flat.jpg' },
        { id: 'pvc-patch', name: 'PVC Patch', image: '/design_assets/decorations/PVC Patch.jpg' },
        { id: 'woven-patch', name: 'Woven Patch', image: '/design_assets/decorations/Brand MakersWoven Patch.jpg' },
        { id: 'screen-print', name: 'Screen Print', image: '/design_assets/decorations/Screen Print Flat.jpg' },
        { id: 'silicone-transfer', name: 'Silicone Transfer', image: '/design_assets/decorations/Silicone Transfer.webp' },
        { id: 'tpu-transfer', name: 'TPU Transfer', image: '/design_assets/decorations/TPU Transfer.jpg' },
        { id: 'tpu-flexstyle', name: 'TPU Flexstyle', image: '/design_assets/decorations/TPU_Flexstyle .jpg' },
    ],
};
