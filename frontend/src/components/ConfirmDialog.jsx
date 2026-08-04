import Swal from 'sweetalert2';

export const confirmDelete = async (itemName = 'this item') => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete ${itemName}. This cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#64748B',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });
    return result.isConfirmed;
};

export default confirmDelete;
