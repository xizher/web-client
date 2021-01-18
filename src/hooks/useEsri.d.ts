import { Ref } from 'vue';

export declare function usePixelData () : {
  updating: Ref<boolean>,
  getPixelData: () => __esri.PixelData
}

interface IEventHandler {
  remove () : void
}

export declare function useViewOn (name: 'blur', callBack: __esri.MapViewBlurEventHandler) : IEventHandler
export declare function useViewOn (name: 'click', callBack: __esri.MapViewClickEventHandler) : IEventHandler
export declare function useViewOn (name: 'drag', callBack: __esri.MapViewDragEventHandler) : IEventHandler
export declare function useViewOn (name: 'mouse-wheel', callBack: __esri.MapViewMouseWheelEventHandler) : IEventHandler
