import './leaflet_plus';
import * as L from 'leaflet';

describe('Leaflet', () => {
  describe('when creating a popup', () => {
    it('should have an autoWidth option, defaulting to true', () => {
      let popup = L.popup();
      popup._initLayout();
      popup._updateLayout();

      expect(popup.options.autoWidth).toBe(true);
      expect(popup._contentNode.style.width).toBe((popup.options.minWidth || 50) + 1 + 'px');
    });

    it('should not compute its width automatically when autoWidth option is false', () => {
      let popup = L.popup({ autoWidth: false });
      popup._initLayout();
      popup._updateLayout();

      expect(popup.options.autoWidth).toBe(false);
      expect(popup._contentNode.style.width).toBe('');
    });
  });
});
