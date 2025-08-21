import { useMaterialStore, useSelector } from '@low-coder/low-coder-shared';
import { selectMaterials } from '@low-coder/low-coder-store';
import { memo } from 'react';

import MaterialItem from './MaterialItem';

const MaterialList = memo(() => {
  const materialStore = useMaterialStore();
  const materials = useSelector(selectMaterials, materialStore);

  return (
    <div className="w-full h-full p-3 grid grid-cols-2 gap-2 auto-rows-[120px]">
      {materials.map((material) =>
        !material?.disabled ? (
          <MaterialItem key={material.id} materialId={material.id} />
        ) : null,
      )}
    </div>
  );
});

export default MaterialList;
