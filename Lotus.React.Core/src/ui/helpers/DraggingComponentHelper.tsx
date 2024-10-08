import { IVector3 } from 'lotus-core';

export class DraggingComponentHelper
{
  private static getDraggableAncestor(path: EventTarget[]): null | HTMLDialogElement 
  {
    let draggableFlag = false
    for (let i = 0; i < path.length; i++) 
    {
      const et = path[i] as HTMLElement

      if (et.tagName === 'BUTTON' || et.tagName === 'A') 
      {
        return null
      }

      if (et.tagName === 'DIALOG' && draggableFlag) 
      {
        return et as HTMLDialogElement
      }

      if (et.dataset && Object.hasOwn(et.dataset, 'dialogDraggable')) 
      {
        draggableFlag = true
      }
    }

    return null
  }

  private static getCssTranslateCoords(transformExp: string): IVector3
  {
    if (transformExp === '') 
    {
      return { x: 0, y: 0, z: 0 }
    }
    const matchResult = transformExp.match(/translate3d\((?<x>[-.\d]+)(?:px)?,\s*(?<y>[-.\d]+)(?:px)?,\s*(?<z>[-.\d]+)(?:px)?\)/)
    if (!matchResult || !matchResult.groups) 
    {
      return { x: 0, y: 0, z: 0 }
    }

    return {
      x: Number(matchResult.groups.x),
      y: Number(matchResult.groups.y),
      z: Number(matchResult.groups.z)
    }
  }

  public static startDragFromPointerDown(event: PointerEvent)
  {
    const target = event.target as HTMLElement
    if (!target) 
    {
      return
    }

    let dialog: HTMLDialogElement
    if (target.tagName === 'DIALOG') 
    {
      dialog = target as HTMLDialogElement
    }
    else 
    {
      const path = event.composedPath()
      const dialogAncestor = DraggingComponentHelper.getDraggableAncestor(path)
      if (!dialogAncestor) 
      {
        return
      }
      dialog = dialogAncestor as HTMLDialogElement
    }

    const { x, y } = DraggingComponentHelper.getCssTranslateCoords(dialog.style.transform)
    const xOffset = event.clientX - dialog.offsetLeft - x
    const yOffset = event.clientY - dialog.offsetTop - y
    const xMin = -dialog.offsetLeft
    const xMax = window.innerWidth - dialog.offsetLeft - dialog.offsetWidth
    const yMin = -dialog.offsetTop
    const yMax = window.innerHeight - dialog.offsetTop - dialog.offsetHeight

    // if (xOffset < 0 || xOffset > dialog.offsetWidth) 
    // {
    //   return
    // }
    // if (yOffset < 0 || yOffset > dialog.offsetHeight) 
    // {
    //   return
    // }

    function calculateTransform(pointerX: number, pointerY: number) 
    {
      const xMoved = pointerX - dialog.offsetLeft - xOffset
      const yMoved = pointerY - dialog.offsetTop - yOffset
      const x = Math.min(Math.max(xMin, xMoved), xMax)
      const y = Math.min(Math.max(yMin, yMoved), yMax)

      dialog.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    dialog.setPointerCapture(event.pointerId)

    const handleMove = (pointerMoveEvt: PointerEvent) => 
    {
      calculateTransform(pointerMoveEvt.clientX, pointerMoveEvt.clientY)
    }

    const handleTouchMove = (touchMoveEvt: TouchEvent) => 
    {
      touchMoveEvt.preventDefault()
      const clientX = touchMoveEvt.touches[0].clientX
      const clientY = touchMoveEvt.touches[0].clientY
      calculateTransform(clientX, clientY)
    }

    dialog.addEventListener('pointermove', handleMove)
    dialog.addEventListener('touchmove', handleTouchMove)
    
    // handle release
    dialog.addEventListener('pointerup',
      function (pointerUpEvt: PointerEvent) 
      {
        dialog.releasePointerCapture(pointerUpEvt.pointerId)
        dialog.removeEventListener('pointermove', handleMove)
        dialog.removeEventListener('touchmove', handleTouchMove)
      },
      { once: true }
    )
  }
}